import styled from 'styled-components';

export const TopWrapper = styled.div`
    position: fixed;
    background-color: #ACAACC;
    width : 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 1000;  
    padding: 1rem 1rem;
    margin-bottom: 2rem;
`

export const LinkWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`

export const Header = styled.div`
    display: flex;
    align-items: center;
`

export const Title = styled.div`
    font-size: 2.5rem;
    display: flex;
    align-items: center;
    margin-left: 20px;
    color: white;
    img{
        max-width: 40px;
        margin-right: 6px;
    }
`

export const Avatar = styled.div`
    margin: 0 20px 0 10px;
`
