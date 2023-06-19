import { Fragment } from "react";
import personService from "../services/persons";

const Persons = ({ persons, setPersons, query, setMessage }) => {
  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(query.toLowerCase())
  );
  return personsToShow.map((person) => (
    <Fragment key={person.id}>
      <Person person={person} />
      <DeletePersonButton
        persons={persons}
        setPersons={setPersons}
        personToDelete={person}
        setMessage={setMessage}
      ></DeletePersonButton>
    </Fragment>
  ));
};

const Person = ({ person }) => {
  return (
    <div>
      {person.name} {person.number}
    </div>
  );
};

const DeletePersonButton = ({
  persons,
  setPersons,
  personToDelete,
  setMessage,
}) => {
  return (
    <button
      onClick={() => {
        if (window.confirm(`Delete ${personToDelete.name}?`)) {
          personService
            .deletePerson(personToDelete.id)
            .then((deletedPerson) => {
              setPersons(
                persons.filter((person) => person.id !== personToDelete.id)
              );
              setMessage(`Deleted ${personToDelete.name}`);
              setTimeout(() => {
                setMessage(null);
              }, 5000);
            })
            .catch((error) => {
              alert(
                `The person '${personToDelete.name}' was already deleted from server`
              );
              setPersons(
                persons.filter((person) => person.id !== personToDelete.id)
              );
            });
        }
      }}
    >
      delete
    </button>
  );
};

export default Persons;
