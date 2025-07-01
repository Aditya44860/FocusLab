import React, { useRef, useEffect, useState } from 'react'

const TextEditor = ({ content, onChange, title }) => {
  const contentRef = useRef(null)

  const formatDoc = (cmd, value = null) => {
    if (value) {
      document.execCommand(cmd, false, value)
    } else {
      document.execCommand(cmd)
    }
  }

  const addLink = () => {
    let url = prompt('Insert url')
    if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url
    }
    formatDoc('createLink', url)
  }

  const handleContentChange = () => {
    if (contentRef.current) {
      onChange(contentRef.current.innerHTML)
    }
  }

  useEffect(() => {
    if (contentRef.current && content !== contentRef.current.innerHTML) {
      contentRef.current.innerHTML = content || ''
    }
  }, [content])

  useEffect(() => {
    const contentEl = contentRef.current
    if (contentEl) {
      const handleMouseEnter = () => {
        const links = contentEl.querySelectorAll('a')
        links.forEach(link => {
          link.addEventListener('mouseenter', () => {
            contentEl.setAttribute('contenteditable', false)
            link.target = '_blank'
          })
          link.addEventListener('mouseleave', () => {
            contentEl.setAttribute('contenteditable', true)
          })
        })
      }
      contentEl.addEventListener('mouseenter', handleMouseEnter)
      return () => contentEl.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [])

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif' }} className="w-full max-h-screen bg-[#F7E5C5] rounded-2xl overflow-hidden mt-[3%] border-2 border-[#C49B59]">
      <link href='https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css' rel='stylesheet' />
      <style>{`
        #content a {
          color: blue;
          text-decoration: underline;
          cursor: pointer;
        }
        #content ul {
          list-style-type: disc;
          padding-left: 20px;
        }
        #content ol {
          list-style-type: decimal;
          padding-left: 20px;
        }
        #content li {
          display: list-item;
          margin-left: 0;
        }
      `}</style>
      <div className="p-4 bg-[#967259]">
        <div className="flex gap-2 mb-4 flex-wrap justify-center">
          <select onChange={(e) => { formatDoc('fontSize', e.target.value); e.target.selectedIndex = 0 }} className="text-glow border-2 border-[#ad8340] rounded outline-none cursor-pointer">
            <option value="" disabled>Font size</option>
            <option value="1">Extra small</option>
            <option value="2">Small</option>
            <option value="3">Regular</option>
            <option value="4">Medium</option>
            <option value="5">Large</option>
            <option value="6">Extra Large</option>
            <option value="7">Big</option>
          </select>
          <div className="text-glow border-2 border-[#ad8340] rounded flex items-center gap-1 px-2 cursor-pointer">
            <span className="text-sm">Color</span>
            <input type="color" onChange={(e) => { formatDoc('foreColor', e.target.value); e.target.value = '#000000' }} className="border-none w-6 h-6 cursor-pointer" />
          </div>
          <div className="text-glow border-2 border-[#ad8340] rounded flex items-center gap-1 px-2 cursor-pointer">
            <span className="text-sm">Background</span>
            <input type="color" onChange={(e) => { formatDoc('hiliteColor', e.target.value); e.target.value = '#000000' }} className="border-none w-6 h-6 cursor-pointer" />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 justify-center">
          <button onClick={() => formatDoc('undo')} className="button-glow border-2 border-[#C49B59] rounded cursor-pointer w-10 h-10 flex items-center justify-center text-lg hover:bg-gray-100"><i className='bx bx-undo'></i></button>
          <button onClick={() => formatDoc('redo')} className="button-glow border-2 border-[#C49B59] rounded cursor-pointer w-10 h-10 flex items-center justify-center text-lg hover:bg-gray-100"><i className='bx bx-redo'></i></button>
          <button onClick={() => formatDoc('bold')} className="button-glow border-2 border-[#C49B59] rounded cursor-pointer w-10 h-10 flex items-center justify-center text-lg hover:bg-gray-100"><i className='bx bx-bold'></i></button>
          <button onClick={() => formatDoc('underline')} className="button-glow border-2 border-[#C49B59] rounded cursor-pointer w-10 h-10 flex items-center justify-center text-lg hover:bg-gray-100"><i className='bx bx-underline'></i></button>
          <button onClick={() => formatDoc('italic')} className="button-glow border-2 border-[#C49B59] rounded cursor-pointer w-10 h-10 flex items-center justify-center text-lg hover:bg-gray-100"><i className='bx bx-italic'></i></button>
          <button onClick={() => formatDoc('strikeThrough')} className= "button-glow border-2 border-[#C49B59] rounded cursor-pointer w-10 h-10 flex items-center justify-center text-lg hover:bg-gray-100"><i className='bx bx-strikethrough'></i></button>
          <button onClick={() => formatDoc('justifyLeft')} className="button-glow border-2 border-[#C49B59] rounded cursor-pointer w-10 h-10 flex items-center justify-center text-lg hover:bg-gray-100"><i className='bx bx-align-left'></i></button>
          <button onClick={() => formatDoc('justifyCenter')} className="button-glow border-2 border-[#C49B59] rounded cursor-pointer w-10 h-10 flex items-center justify-center text-lg hover:bg-gray-100"><i className='bx bx-align-middle'></i></button>
          <button onClick={() => formatDoc('justifyRight')} className= "button-glow border-2 border-[#C49B59] rounded cursor-pointer w-10 h-10 flex items-center justify-center text-lg hover:bg-gray-100"><i className='bx bx-align-right'></i></button>
          <button onClick={() => formatDoc('insertOrderedList', false, null)} className="button-glow border-2 border-[#C49B59] rounded cursor-pointer w-10 h-10 flex items-center justify-center text-lg hover:bg-gray-100"><i className='bx bx-list-ol'></i></button>
          <button onClick={() => formatDoc('insertUnorderedList', false, null)} className="button-glow border-2 border-[#C49B59] rounded cursor-pointer w-10 h-10 flex items-center justify-center text-lg hover:bg-gray-100"><i className='bx bx-list-ul'></i></button>
          <button onClick={addLink} className="button-glow border-2 border-[#C49B59] rounded cursor-pointer w-10 h-10 flex items-center justify-center text-lg hover:bg-gray-100"><i className='bx bx-link'></i></button>
          <button onClick={() => formatDoc('unlink')} className="button-glow border-2 border-[#C49B59] rounded cursor-pointer w-10 h-10 flex items-center justify-center text-lg hover:bg-gray-100"><i className='bx bx-unlink'></i></button>
          
        </div>
      </div>
      <div 
        id="content"
        ref={contentRef}
        contentEditable="true" 
        spellCheck="false"
        onInput={handleContentChange}
        className="w-full h-[calc(100vh-200px)] p-4  rounded-lg resize-none focus:outline-none focus:border-[#B6825E] bg-[#fff3ded2] text-[#4C4037] overflow-scroll"
        style={{ maxHeight: '55vh', fontSize: '16px', lineHeight: '1.6' }}
        suppressContentEditableWarning={true}
      >
        
      </div>
    </div>
  )
}

export default TextEditor