bundle-components:
	zip components.zip src/App.js src/LovableFilterableTable.js src/loading-ring.svg src/LovableFilterableTable.css src/App.css && git add components.zip

push:
	 cd ../../.. && git subtree push --prefix blog/code/crypto-search crypto-search-origin master