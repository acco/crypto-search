bundle-components:
	zip -r components.zip src/App.js src/LovableFilterableTable.js src/loading-ring.svg src/LovableFilterableTable.css src/App.css src/milligram.min.css src/index.js src/font-awesome && git add components.zip

push:
	 cd ../../.. && git subtree push --prefix blog/code/crypto-search crypto-search-origin master