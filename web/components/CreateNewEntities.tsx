import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';

import { Entity, Person, Instrument, Place } from 'types';
import useCurrentUser from 'hooks/useCurrentUser';

import Modal from 'components/Modal';
import CreatePersonForm from 'components/CreatePersonForm';
import CreateInstrumentForm from 'components/CreateInstrumentForm';
import CreatePlaceForm from 'components/CreatePlaceForm';

interface Props {
  onNewEntityCreated: (entity: Entity) => void;
}
const CreateNewEntities = ({ onNewEntityCreated }: Props) => {
  const [currentUser] = useCurrentUser();
  const router = useRouter();

  const [createPersonModalIsVisible, setCreatePersonModalIsVisible] = useState(
    false
  );
  const [
    createInstrumentModalIsVisible,
    setCreateInstrumentModalIsVisible,
  ] = useState(false);
  const [createPlaceModalIsVisible, setCreatePlaceModalIsVisible] = useState(
    false
  );

  const redirectToLogin = useCallback(() => {
    router.push({
      pathname: '/login',
      query: {
        redirectTo: window.location.pathname,
      },
    });
  }, [router]);

  const onCreateNewPersonClicked = useCallback(() => {
    if (!currentUser) {
      return redirectToLogin();
    }
    setCreatePersonModalIsVisible(true);
  }, [currentUser]);

  const onCreateNewInstrumentClicked = useCallback(() => {
    if (!currentUser) {
      return redirectToLogin();
    }
    setCreateInstrumentModalIsVisible(true);
  }, [currentUser]);

  const onCreateNewPlaceClicked = useCallback(() => {
    if (!currentUser) {
      return redirectToLogin();
    }
    setCreatePlaceModalIsVisible(true);
  }, [currentUser]);

  const onNewPersonCreated = useCallback((person: Person) => {
    setCreatePersonModalIsVisible(false);
    onNewEntityCreated(person);
  }, []);

  const onNewInstrumentCreated = useCallback((instrument: Instrument) => {
    setCreateInstrumentModalIsVisible(false);
    onNewEntityCreated(instrument);
  }, []);

  const onNewPlaceCreated = useCallback((place: Place) => {
    setCreatePlaceModalIsVisible(false);
    onNewEntityCreated(place);
  }, []);

  return (
    <>
      <div>
        Can't find it? Create new:{' '}
        <button className="btn-text" onClick={onCreateNewPersonClicked}>
          Person
        </button>
        {', '}
        <button className="btn-text" onClick={onCreateNewInstrumentClicked}>
          Instrument
        </button>
        {', '}
        <button className="btn-text" onClick={onCreateNewPlaceClicked}>
          Place
        </button>
      </div>

      <Modal
        title="Create New Person"
        isVisible={createPersonModalIsVisible}
        onClose={() => setCreatePersonModalIsVisible(false)}
      >
        <CreatePersonForm onSuccess={onNewPersonCreated} />
      </Modal>

      <Modal
        title="Create New Instrument"
        isVisible={createInstrumentModalIsVisible}
        onClose={() => setCreateInstrumentModalIsVisible(false)}
      >
        <CreateInstrumentForm onSuccess={onNewInstrumentCreated} />
      </Modal>

      <Modal
        title="Create New Place"
        isVisible={createPlaceModalIsVisible}
        onClose={() => setCreatePlaceModalIsVisible(false)}
      >
        <CreatePlaceForm onSuccess={onNewPlaceCreated} />
      </Modal>
    </>
  );
};

export default CreateNewEntities;
