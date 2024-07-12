import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from "./test/utils"
import App from './App'

it('renders watch later link', async () => {
  renderWithProviders(<App />)
  const linkElement = screen.getByText(/watch later/i)
  expect(linkElement).toBeInTheDocument()
})

it('no trailer available and view Trailer', async () => {
  renderWithProviders(<App />)
  await userEvent.type(screen.getByTestId('search-movies'), 'ade')
  await waitFor(() => {
    expect(screen.getAllByText('Adé')[1]).toBeInTheDocument()
  })
  let viewTrailerBtn = screen.getAllByText('View Trailer')[1]
  await userEvent.click(viewTrailerBtn)
  await waitFor(() => {
    const player = screen.getByText(/no trailer available. Try another movie/i);
    expect(player).toBeInTheDocument();
  })

  await waitFor(() => {
    expect(screen.getAllByText('The Adventures')[0]).toBeInTheDocument()
  })
  viewTrailerBtn = screen.getAllByText('View Trailer')[0]
  await userEvent.click(viewTrailerBtn)
  await waitFor(() => {
    const player = screen.getByTestId('youtube-player');
    expect(player).toBeInTheDocument()
  })

})

it('renders watch later component', async() => {
  renderWithProviders(<App />)
  const user = userEvent.setup()
  await user.click(screen.getByText(/watch later/i))
  expect(screen.getByText(/You have no movies saved to watch later/i)).toBeInTheDocument()
})

it('calls searchMovies and navigates to home',async () => {
  const searchMovies = jest.fn();
  renderWithProviders(<App searchMovies={searchMovies('')}/>);
  const user = userEvent.setup()
  await user.click(screen.getByTestId('home'))
  await waitFor(() => {
    expect(searchMovies).toHaveBeenCalledWith('');
  })  
})

it('renders starred component', async() => {
  renderWithProviders(<App />)
  const user = userEvent.setup()
  await user.click(screen.getByTestId('nav-starred')) 
  await waitFor(() => {
    expect(screen.getByText(/There are no starred movies/i)).toBeInTheDocument()
  })  
  await waitFor(() => {
    expect(screen.getByTestId('starred')).toBeInTheDocument()
  })  
})