# C-fork library
Sick on fork not cloning the current process like expected in Unix?
Cfork is a small lib that allows you use fork() in the same way C language does.

## Installation

```bash
npm i @gabictrlz/c-fork
```

## Usage

### createLinkToken

```javascript
import { cfork } from '@gabictrlz/c-fork'

console.log('should print this once'); // you'll get this log only once

const pid = cfork.fork();
console.log('forked pid: ' + pid); // you'll get this log twice, for the parent and child

```
