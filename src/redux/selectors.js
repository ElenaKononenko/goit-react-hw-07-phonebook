import { createSelector } from '@reduxjs/toolkit';
export const getLoading = state => state.contacts.loading;
export const getAllContacts = state => state.contacts.items;
export const getFilter = state => state.contacts.filter;

export const getVisibleContacts = createSelector(
  [getFilter, getAllContacts],
  (filter, contacts) => {
    const normalizedfilter = filter.toLocaleLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedfilter),
    );
  },
);

// export const getVisibleContacts = state => {
//   const filter = getFilter(state);
//   const contacts = getAllContacts(state);
//   const normalizedfilter = filter.toLocaleLowerCase();
//   return contacts.filter(contact =>
//     contact.name.toLowerCase().includes(normalizedfilter),
//   );
// };
