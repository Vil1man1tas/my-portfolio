const Footer = () => {
    let footer_container = {    
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 30px',
        background: '#ff9494',
        color: '#cee79a',
        height: '70px'
    }

  return (
    <footer>
        <div className="container" style={footer_container}>
            <h5>Pas mus patys skaniausi receptai.</h5>
            <h5>Surask savo ir išbandyk.</h5>
        </div>
    </footer>
  )
}

export default Footer