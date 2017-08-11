# Flickr-API

The program makes call to Flickr API and saves public ***image URL***, ***number of views of image*** and ***total count of uploads of user*** in a CSV file.

The above has been written in *NodeJS* and has been tested on Ubuntu 16.04.

** This program is not scheduled. For scheduled version, change branch to scheduling.**

As the program is not scheduled, its suggested to keep the pull parameters low, in order not to violate API regulation (3600 hits/hour)

If running the program for the first time,run
``` ./submit.sh ```

For further running, use 
``` 
./run.sh 
```

You may need to give execute permission to the script, so if any error comes on executing above command, do:
```
chmod +x submit.sh
chmod +x run.sh
```
