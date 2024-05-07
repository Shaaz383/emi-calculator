
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [principal, setPrincipal] = useState(0);
  const [interest, setInterest] = useState(0);
  const [years, setYears] = useState(0);
  const [emi, setEMI] = useState(0);

  const handleChange = (e) => {
    console.log(e.target.id, e.target.value);
    const id = e.target.id;
    const value = parseInt(e.target.value);
    if (id === 'principal') {
     setPrincipal(value);
    } else if (id === 'interest') {
      setInterest(value);
    } else {
      setYears(value);
    }
  }

  // P(r(1+r)^n/((1+r)^n)-1))
  const calculateEMI = () => {
    let r = interest;
    if (principal && r && years) {
      r = r / 12 / 100; // per month
      const calcPow = Math.pow(1 + r, years * 12);
      const amount = principal * ((r * calcPow) / (calcPow - 1));
      setEMI(Math.round(amount));
    }
  }

  useEffect(() => {
    calculateEMI();
  }, [principal, interest, years])

  return (
    <div className='loan-calc bg-[#efd9b4] p-10  flex flex-col justify-between items-center gap-8 rounded'>
      <h1 className='text-3xl font-semibold'>EMI Calculator</h1>

      <div className='inputes flex flex-col gap-2'>
        <p className='font-semibold'>Principal:</p>
        <input className='px-4 py-2'
          onChange={handleChange}
          type='number' id='principal' />

        <p className='font-semibold'>Interest:</p>
        <input className='px-4 py-2'
          onChange={handleChange}
          type='number' id='interest' />

        <p className='font-semibold'>Years:</p>
        <input className='px-4 py-2'
          onChange={handleChange}
          type='number' id='year' />
      </div>

      <div className='output font-semibold text-#4d6160'>
        <h1 className='text-#4d6160'>

        Your EMI is <span className='text-green-700'>{emi}</span> 
        </h1>
      </div>
    </div>
  )
}

export default App;