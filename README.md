# XTerm.js for React

A React library to use the powerful of [Xterm.js](https://github.com/xtermjs/xterm.js)

[![npm version](https://img.shields.io/npm/v/react-xtermjs.svg)](https://www.npmjs.com/package/react-xtermjs)
[![npm download](https://img.shields.io/npm/dw/react-xtermjs)](https://www.npmjs.com/package/react-xtermjs)

## Getting Started

### Installation

NPM:

```sh
    npm install react-xtermjs
```

Yarn:

```sh
    yarn add react-xtermjs
```

### Usage

This package provides two main ways to use the XTerm component: using the useXTerm hook and the XTerm component.

#### Using the `useXTerm`` hook

The useXTerm hook is a flexible way to integrate XTerm.js with fine-grained control over the terminal instance.

**Example**

```js
import React, { useRef, useEffect } from 'react'
import { useXTerm } from 'react-xtermjs'

const MyTerminal = () => {
  const { instance, ref } = useXTerm()
  instance?.writeln('Hello from react-xtermjs!')
  instance?.onData((data) => instance?.write(data))

  return <div ref={ref} style={{ width: '100%', height: '100%' }} />
}
```

#### Using the `XTerm`` component

The XTerm component offers a higher-level abstraction, making it easier to integrate the terminal with minimal setup.

**Example**

```js
import React from 'react'
import { XTerm } from 'react-xtermjs'

const MyTerminal = () => {
  const onData = (data) => {
    console.log(`Received data: ${data}`)
  }

  const onResize = (cols, rows) => {
    console.log(`Terminal resized to ${cols} columns and ${rows} rows`)
  }

  return (
    <XTerm
      onData={onData}
      onResize={onResize}
      options={{ cursorBlink: true }}
      style={{ width: '100%', height: '100%' }}
    />
  )
}
```

For a full list of available parameters, refer to the XTerm.js documentation: [XTerm.js Docs](https://xtermjs.org/docs/).

<hr />

<p>react-xtermjs is initiated and maintained by <a href="https://qovery.com" target="blank">Qovery</a>.</p>
