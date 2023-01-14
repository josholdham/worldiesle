import { Theme } from 'react-autosuggest';

const theme: Theme = {
  container: {
    position: 'relative',
    marginBottom: 5,
    width: '100%',
  },
  suggestionsContainer: {
    position: 'absolute',
    zIndex: 2,
    maxHeight: '13rem',
    overflowY: 'scroll',
    width: '100%',
  },
  suggestionsContainerOpen: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
  },
  suggestionsList: {
    listStyleType: 'none',
    borderColor: 'white',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  suggestion: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: '#343536',
  },
  suggestionHighlighted: {
    fontWeight: 'bold',
  },
};

export default theme;
