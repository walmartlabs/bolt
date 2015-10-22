#!/bin/sh
set -e

for f in packages/*; do
  if [ -d "$f/src" ]; then
  	echo "Running babel on $f"
    node ./node_modules/babel/bin/babel "$f/src" --out-dir "$f/lib" --copy-files $1 &
  fi
done

# if [ $1="--watch" ]; then
#   # Relink CLI watcher
#   echo "Watching CLI for relink"
#   chsum1=""
#   cd packages/electrode-bolt-cli

#   sleep 2
#   while [[ true ]]
#   do
#     if [ -d 'lib' ]; then
#       chsum2=`find lib -type f -exec md5 {} \;`
#       if [[ $chsum1 != $chsum2 ]] ; then
#         npm link
#         chsum1=$chsum2
#       fi
#     fi
#     sleep 2
#   done
# fi

wait
