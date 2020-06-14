function starOutGrid(grid) {
  const starIdx = []
  for (i=0;i<grid.length;i++) {
    grid[i].indexOf("*") !== -1 ? starIdx.push({[i]: grid[i].indexOf("*")}) : null
  }	

  for (i=0;i<starIdx.length;i++) {
    let row = Object.keys(starIdx[i])
    let column = Object.values(starIdx[i])
    
    grid[row].fill("*")
    for (j=0;j<grid.length;j++) {
        grid[j][column] = "*"
    }
  }

 return grid

}
