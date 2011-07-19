#!/bin/sh

name=TabFinder
version=`cat manifest.json | grep '"version":' | sed -e 's/[\," ]//g' -e 's/version://'`
crx=TabFinder-$version.crx
releasename=$name-$version

dir="$( cd "$( dirname "$0" )" && pwd )"
dest="$dir/$releasename"
pem="$dir/../$name.pem"

echo "chrome extension:" $name
echo "version:" $version
echo "release name:" $releasename
echo "crx:" $crx

echo "extension dir:" $dest

echo
echo "=> creating extension dirs..."
rm -rf $dest
mkdir -vp $dest
mkdir -vp $dest/gfx
mkdir -vp $dest/lib

echo
echo "=> copying files..."
cp -vf manifest.json $dest
cp -vf popup.html popup.js popup.css $dest
cp -vf lib/jquery-1.6.2.js $dest/lib
cp -vf gfx/*.ico gfx/*.png $dest/gfx

echo
echo "=> creating zip from \"$dest\"..."
rm -f $releasename.zip
zip -r $releasename.zip $releasename

echo
echo "=> packing extension ($crx)..."
chrome --pack-extension="$dest" --pack-extension-key="$pem"
