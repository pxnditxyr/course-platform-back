export const extractPrismaExceptions = ( error : any ) : string | undefined => {
  if ( error.code === 'P2002' ) {
    if ( typeof error.meta.target === 'string' ) {
      const target = splitTarget( error.meta.target )
      return `The ${ target } is already in use`
    }
    return error.meta.target.map( ( field : string ) =>
      `The ${ field } is already in use` ).join( ', ' )
  }
  
  if ( !error.code ) {
    const stackLines = error.stack.split( '\n' )
    let argumentLine = ''

    for ( const line of stackLines ) {
      if ( line.match( /Argument .*/ ) ) {
        argumentLine = line
        break
      }
    }
    argumentLine = argumentLine.replace( 'contains', 'search' )
    argumentLine = argumentLine.replace( 'take', 'limit' )
    argumentLine = argumentLine.replace( 'skip', 'offset' )
    return argumentLine
  }
}

const splitTarget = ( target : string ) : string => {
  const targetArray = target.split( '_' )
  targetArray.shift()
  targetArray.pop()

  const capitalizedTarget = targetArray.map( ( word : string ) =>
    word.charAt( 0 ).toUpperCase() + word.slice( 1 ) )
  return capitalizedTarget.join( ' ' )
}
