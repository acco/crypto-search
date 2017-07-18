bundle-components:
	zip components.zip src/App.js src/LovableFilterableTable.js && git add components.zip

push:
	 cd ../../.. && git subtree push --prefix blog/code/crypto-search crypto-search-origin master