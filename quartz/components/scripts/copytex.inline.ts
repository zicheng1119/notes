// 点击任意公式复制其 LaTeX 源码。委托到 document，绑定一次即兼容 SPA 翻页。
if (!(window as any).__texCopyInit) {
  ;(window as any).__texCopyInit = true
  document.addEventListener("click", (e) => {
    const k = (e.target as HTMLElement)?.closest?.(".katex") as HTMLElement | null
    if (!k) return
  const tex = k.querySelector('annotation[encoding="application/x-tex"]')?.textContent
    if (!tex) return
    navigator.clipboard
      ?.writeText(tex.trim())
    .then(() => {
   k.classList.add("tex-copied")
        setTimeout(() => k.classList.remove("tex-copied"), 900)
      })
      .catch(() => {})
  })
}
