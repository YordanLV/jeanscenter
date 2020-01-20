const colorLanguageConverter = word => {
  switch (word.toLowerCase()) {
  case 'beige':
    return '#F5F1DE';
  case 'blauw':
    return '#0060FF';
  case 'bruin':
    return '#663300';
  case 'denim blauw':
    return '#0066cc';
  case 'denim frijs':
    return '#c0ccd8';
  case 'denim zwart':
    return '#01060c';
  case 'geel':
    return '#fff000';
  case 'grijs':
    return '#f7f7f7';
  case 'groen':
    return '#00cc00';
  case 'oranje':
    return '#ff8c00';
  case 'paars':
    return '#663399';
  case 'rood':
    return 'ff3300';
  case 'roze':
    return '#FF33CC';
  case 'wit':
    return '#FFF';
  case 'zilver':
    return '#C0C0C0';
  case 'zwart':
    return '#000';
  default:
    return '#f7f7f7';
  }
};

export default colorLanguageConverter;
