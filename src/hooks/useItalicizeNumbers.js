import { useEffect } from 'react'

const DIGIT_PATTERN = /(\d[\d.,:%/+-]*[a-zA-Z]?)/g
const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'TEXTAREA', 'INPUT', 'SELECT', 'OPTION', 'SVG', 'PATH'])

function shouldSkipNode(node, root) {
  let current = node.parentNode

  while (current && current !== root) {
    if (current.nodeType !== Node.ELEMENT_NODE) {
      current = current.parentNode
      continue
    }

    if (SKIP_TAGS.has(current.tagName)) {
      return true
    }

    if (current.classList?.contains('cms-numeric')) {
      return true
    }

    if (current.isContentEditable) {
      return true
    }

    current = current.parentNode
  }

  return false
}

function wrapNumbersInTextNode(textNode) {
  const text = textNode.textContent

  if (!text || !/\d/.test(text)) {
    return
  }

  const parts = text.split(DIGIT_PATTERN)

  if (parts.length === 1) {
    return
  }

  const fragment = document.createDocumentFragment()

  parts.forEach((part, index) => {
    if (!part) {
      return
    }

    if (index % 2 === 1) {
      const span = document.createElement('span')
      span.className = 'cms-numeric'
      span.textContent = part
      fragment.appendChild(span)
      return
    }

    fragment.appendChild(document.createTextNode(part))
  })

  textNode.parentNode?.replaceChild(fragment, textNode)
}

function processRoot(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  const textNodes = []

  while (walker.nextNode()) {
    const textNode = walker.currentNode

    if (shouldSkipNode(textNode, root)) {
      continue
    }

    textNodes.push(textNode)
  }

  textNodes.forEach(wrapNumbersInTextNode)
}

function useItalicizeNumbers(rootRef) {
  useEffect(() => {
    const root = rootRef.current

    if (!root) {
      return undefined
    }

    let frameId = null
    let observer = null

    const run = () => {
      processRoot(root)
    }

    const scheduleRun = () => {
      if (frameId !== null) {
        return
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = null

        observer?.disconnect()
        run()
        observer?.observe(root, {
          childList: true,
          characterData: true,
          subtree: true,
        })
      })
    }

    run()

    observer = new MutationObserver(() => {
      scheduleRun()
    })

    observer.observe(root, {
      childList: true,
      characterData: true,
      subtree: true,
    })

    return () => {
      observer?.disconnect()

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId)
      }
    }
  }, [rootRef])
}

export default useItalicizeNumbers
