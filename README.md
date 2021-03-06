# obglinker

To let developers link their projects to another project within VScode.

## Installation

Use the vsix file from vsix folder.

## Features

Link selected package to the target folder.
![Print Preferences](https://github.com/lkiss/vscode.npmLinker/blob/master/images/link_project.gif)

Scoped build.
![Print Preferences](https://github.com/lkiss/vscode.npmLinker/blob/master/images/scoped_build.gif)

## Requirements

Configuration must present in user settings.
Use the following settings:
```
"obg": {
    "targetNodeModulesFolder": {
        "your_project_name": "Your root path to the folder where the node_modules folder exist"
    }
}
```

The name of `your_project_name` will be used in the dropdown when you are linking.

If this setting do not exist, error will be thrown.

## Extension Settings


## Known Issues
- After starting the link process it can be cancelled only one by one
- Linking performance issues that sometimes slows down the link process

## Release Notes

### 0.0.3

Fix link cancellation when selecting from dropdown

### 0.0.2

Initial release of obg linker
