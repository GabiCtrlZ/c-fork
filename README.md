# C-fork library
***This fork only works on Unix systems***
Sick on fork not cloning the current process like expected in Unix?
Cfork is a small lib that allows you use fork() in the same way C language does.

`c-fork` creates a new process by duplicating the calling process.
The new process is referred to as the child process. The calling
process is referred to as the parent process.

The child process and the parent process run in separate memory
spaces. At the time of `fork()` both memory spaces have the same
content.

For more information check out the [fork(2)](https://man7.org/linux/man-pages/man2/fork.2.html) man page

## Installation

```bash
npm i @gabictrlz/c-fork
```

## Usage

### Create a fork

```javascript
import { cfork } from '@gabictrlz/c-fork'

console.log('should print this once') // you'll get this log only once

const pid = cfork.fork()
console.log('forked pid: ' + pid) // you'll get this log twice, for the parent and child

```

### ***Note***
The PID returned by fork() is the pid of the child process.
Since the child got no child, it will get 0 as pid, while the parent process will get the pid of the child process.

### Check if child is running

```javascript
import { cfork } from '@gabictrlz/c-fork'

const pid = cfork.fork()

if (pid === 0) {
  // ... do something
} else {
  console.log('parent is running')
  cfork.isRunning(pid) // returns true if child is running, false otherwise
}

```


### Kill child

```javascript
import { cfork } from '@gabictrlz/c-fork'

const pid = cfork.fork()

if (pid === 0) {
  // ... do something
} else {
  console.log('parent is running')
  cfork.kill(pid) // sends SIGTERM to child
}

```

### exit process

```javascript
import { cfork } from '@gabictrlz/c-fork'

type Code = 0 | 1

cfork.exit(code as Code) // exits with supplied code

```


***Pull requests are welcome!***