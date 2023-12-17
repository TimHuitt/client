import { Route, Routes } from 'react-router-dom'
import People from '../../pages/People'
import Show from '../../pages/Show'
import Error from '../../pages/Error'
import Edit from '../../pages/Edit/Edit'

const Main = ({ heroImage }) => {
  return (
    <main className='container'>
      <Routes>
        <Route path="/" element={<People />} />
        <Route path="/people/:id" element={<Show />} />
        <Route path="/people/:id/edit" element={<Edit />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </main>
  );
};

export default Main;