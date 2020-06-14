function snakeToCamel(name) {
    newName = name.split("_")
    
    return newName.map(function(x, idx) {
        if (idx === 0 && x !== x.toUpperCase()) {
            return x.toLowerCase()
        }
        return x.charAt(0).toUpperCase() + x.slice(1)
    }).join('')
}