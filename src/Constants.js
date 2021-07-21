import * as BooksApi from './BooksAPI'
export const shelves = [
    {
        name: 'Currently reading',
        value: 'currentlyReading'
    },
    {
        name: 'Want to read',
        value: 'wantToRead'
    },
    {
        name: 'Read',
        value: 'read'
    },
    {
        name: 'None',
        value: 'none'
    }];

export const useFetchBooks = () => {
    return BooksApi.getAll();
};