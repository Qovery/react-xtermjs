# XTerm.js for React

A React library to use the powerful of [Xterm.js](https://github.com/xtermjs/xterm.js)

[![npm version](https://img.shields.io/npm/v/react-xtermjs.svg)](https://www.npmjs.com/package/react-xtermjs)
[![npm download](https://img.shields.io/npm/dw/react-xtermjs)](https://www.npmjs.com/package/react-xtermjs)

## Getting Started

### Installation

NPM:

```sh
    npm install @xterm/xterm react-xtermjs
```

Yarn:

```sh
    yarn add @xterm/xterm react-xtermjs
```

## Usage

#### `useXTerm` hook:

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

#### `XTerm` component:

```js
const MyTerminal = () => {
  const onData = (data) => {
    console.log(`Received data: ${data}`)
  }

  const onResize = (cols, rows) => {
    console.log(`Terminal resized to ${cols} columns and ${rows} rows`)
  }

  return (
    <XTerm
      options={{ cursorBlink: true }}
      style={{ width: '100%', height: '100%' }}
      listeners={{
        onData,
        onResize,
      }}
    />
  )
}
```

For a full list of available parameters, refer to the XTerm.js documentation: [XTerm.js Docs](https://xtermjs.org/docs/).  
Plus, find a complete example with add-ons of our Console at Qovery [here](https://github.com/Qovery/console/blob/staging/libs/domains/services/feature/src/lib/service-terminal/service-terminal.tsx).

<hr />

`react-xtermjs` is initiated and maintained by <a href="https://qovery.com" target="blank">Qovery</a>
