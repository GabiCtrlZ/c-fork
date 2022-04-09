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

### `cfork.fork()`

* Returns: {number} Returns the child_process pid to the parent and 0 to the child

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

### `cfork.isRunning(pid)`

* `pid` {number} The pid of the child process
* Returns: {number} 0 if the child process is running, otherwise returns the terminating signal number

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

### `cfork.kill(pid)`

* `pid` {number} The pid to kill
* Returns: {void}


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

### `cfork.exit(code)`

* `code` {number} The exit code, either 0 or 1
* Returns: {void}

```javascript
import { cfork } from '@gabictrlz/c-fork'

cfork.exit(0) // kills the current process with exit code 0 or 1

```


### wait for child to settle

### `cfork.waitForChildToSettle(pid, timeout)`

* `pid` {number} The pid of the child process
* `timeout` {number} The timeout in milliseconds
* Returns: {Promise< number >} Returns a promise that resolves to the exit code of the child process

This function returns a promise that resolves when the child process has settled.
In case the child process has thrown an error, the promise will reject with the error.
The promise will also reject in case of timeout.

```javascript
import { cfork } from '@gabictrlz/c-fork'

const pid = cfork.fork()
if (pid === 0) {
  // ... do something
}
else {
  await cfork.waitForChildToSettle(pid, 10_000) // wait for child
  console.log('child exited successfully')
}


***Pull requests are welcome!***