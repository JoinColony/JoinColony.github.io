yarn
yarn run build
export BLUE_DISK=`kubectl get deployment nginx-blue -o json | jq -r '.spec.template.spec.volumes | .[] | select( .name | contains("site-source")) | .gcePersistentDisk.pdName'`
export GREEN_DISK=`kubectl get deployment nginx-green -o json | jq -r '.spec.template.spec.volumes | .[] | select( .name | contains("site-source")) | .gcePersistentDisk.pdName'`
export RED_DISK=`kubectl get deployment nginx-red -o json | jq -r '.spec.template.spec.volumes | .[] | select( .name | contains("site-source")) | .gcePersistentDisk.pdName'`

if [ $BLUE_DISK != $GREEN_DISK ]
then
	echo "Blue and green aren't working from the same disk. Make that the case, then try again"
	exit 99
fi

# Make sure red is using the disk blue and green are using. This means that the other disk will be unused.
kubectl patch deployment nginx-red --patch '{"spec": {"template": {"spec": { "volumes": [{"name":"site-source", "gcePersistentDisk": {"fsType":"ext4", "pdName": "'$BLUE_DISK'", "readOnly": true}}]}}}}'

# Wait until only one nginx-red pod
NPODS=`kubectl get pods | grep nginx-red | wc -l`
while [ $NPODS -ne 1 ]
do
	echo "Waiting for nginx-red pods to sort themselves out..."
	sleep 5
	NPODS=`kubectl get pods | grep nginx-red | wc -l`
done

if [ $BLUE_DISK = "site-source" ]
then
	NEW_DISK="site-source-2"
elif [ $BLUE_DISK = "site-source-2" ]
then
	NEW_DISK="site-source"
else
	echo "Unrecognised old disk: $OLD_DISK"
	exit 99
fi

until gcloud compute instances attach-disk gke-colony-default-pool-7f86a12c-hkwv  --disk $NEW_DISK --device-name $NEW_DISK
do
    echo "Try attach again"
done
gcloud compute ssh --command="mkdir ~/$NEW_DISK" gke-colony-default-pool-7f86a12c-hkwv
gcloud compute ssh --command="mkdir ~/site" gke-colony-default-pool-7f86a12c-hkwv
gcloud compute ssh --command="sudo mount /dev/disk/by-id/google-$NEW_DISK ~/$NEW_DISK" gke-colony-default-pool-7f86a12c-hkwv
gcloud compute ssh --command="sudo rm -r ~/site/*" gke-colony-default-pool-7f86a12c-hkwv
gcloud compute ssh --command="sudo rm -r ~/$NEW_DISK/*" gke-colony-default-pool-7f86a12c-hkwv
gcloud compute scp --recurse ./public/* gke-colony-default-pool-7f86a12c-hkwv:~/site/
gcloud compute ssh --command="sudo mv ~/site/* ~/$NEW_DISK/" gke-colony-default-pool-7f86a12c-hkwv
gcloud compute ssh --command="sudo chown -R root ~/$NEW_DISK/*" gke-colony-default-pool-7f86a12c-hkwv
gcloud compute ssh --command="sudo chgrp -R root ~/$NEW_DISK/*" gke-colony-default-pool-7f86a12c-hkwv
gcloud compute ssh --command="sudo chmod -R -w ~/$NEW_DISK/*" gke-colony-default-pool-7f86a12c-hkwv
gcloud compute ssh --command="sudo umount ~/$NEW_DISK/" gke-colony-default-pool-7f86a12c-hkwv
gcloud compute instances detach-disk gke-colony-default-pool-7f86a12c-hkwv  --disk $NEW_DISK
kubectl patch deployment nginx-red --patch '{"spec": {"template": {"spec": { "volumes": [{"name":"site-source", "gcePersistentDisk": {"fsType":"ext4", "pdName": "'$NEW_DISK'", "readOnly": true}}]}}}}'
# Should also patch nginx-blue and nginx-green.... but not yet while we're testing!