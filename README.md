# obglinker README

Test

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

If this setting do not exist, error will be thrown.

## Extension Settings


## Known Issues
- After starting the link process it can be cancelled only one by one
- Linking performance issues that sometimes slows down the link process

## Release Notes


### 1.0.0

Initial release of obg linker

### 1.0.1

Fixed issue #.

### 1.1.0

Added features X, Y, and Z.
