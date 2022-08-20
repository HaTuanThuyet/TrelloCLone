// OnkeyDown
export const saveContentAffterEnter = (e) => {
    if (e.key === 'Enter') {
        e.preventDefault()
        e.target.blur()
    }
}
// OnInputValue
export const selectAllInlineText = (e) => {
    e.target.focus()
    e.target.select()
}