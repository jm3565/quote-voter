import { render, screen } from '@testing-library/react';
import Header from './Header';

test('should render title, subtilte and total votes labels', () => {
    const { container, getByText } = render(<Header totalCount={12} />);
    expect(container).toBeInTheDocument();
    expect(getByText('Ron Swanson Quote Voter')).toBeInTheDocument();
    expect(getByText('"Vote for your favorite quote!"')).toBeInTheDocument();
    expect(getByText('Total Votes:')).toBeInTheDocument();
});


test('renders Header component with a given count', () => {
  const { getAllByTestId } = render(<Header totalCount={12} />);
  const countEl = getAllByTestId('total-count');

  expect(countEl.length).toBe(1);
  expect(countEl[0].textContent).toBe('12')
});
