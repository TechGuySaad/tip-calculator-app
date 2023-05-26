import PropTypes from "prop-types";
import { useMemo,useEffect } from "react";

function CalculateBill({ values, dispatch }) {
  CalculateBill.propTypes = {
    values: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };
  useEffect(() => {
    function calculate() {
        if(values.bill != 0 && values.tip != 0 && values.people != 0){
            const tipPerPerson = (values.bill * values.tip) / 5;
            const totalBillPerPerson = values.bill / values.people + tipPerPerson;
            dispatch({
              type: "UPDATE_TOTAL_TIP_PER_PERSON",
              payload: tipPerPerson.toFixed(2),
            });
            dispatch({
              type: "UPDATE_TOTAL_BILL_PER_PERSON",
              payload: totalBillPerPerson.toFixed(2),
            });


        }
     
    }

    calculate();
  }, [values.bill, values.tip, values.people, dispatch]);


//   function calculate() {
//     const tipPerPerson = (values.bill * values.tip) / 5;
//     const totalBillPerPerson = values.bill / values.people + tipPerPerson;
//     //    const totalPerPerson = totalBill / values.people;
//     dispatch({
//       type: "UPDATE_TOTAL_TIP_PER_PERSON",
//       payload: tipPerPerson.toFixed(2),
//     });
//     dispatch({
//       type: "UPDATE_TOTAL_BILL_PER_PERSON",
//       payload: totalBillPerPerson.toFixed(2),
//     });
//   }

//   calculate()

  return (
    <div className="total w-1/2 lg:h-full bg-customCyan-500 rounded-xl xs:w-full xs:h-64 flex flex-col justify-between px-10 py-7">
      <div className="tip-total w-full flex flex-col gap-y-4 text-sm">
        <div className="tip-amount flex items-center w-full justify-between">
          <div className="text">
            <p className="text-white">Tip Amount</p>
            <p className="text-customCyan-400 text-sm">/person</p>
          </div>
          <div className="number">
            <p className="text-customCyan-600 text-4xl">
              ${values.total_tip_per_person}
            </p>
          </div>
        </div>

        <div className="tip-amount flex items-center w-full justify-between">
          <div className="text">
            <p className="text-white">Total</p>
            <p className="text-customCyan-400 text-sm">/person</p>
          </div>
          <div className="number">
            <p className="text-customCyan-600 text-4xl">
              ${values.total_bill_per_person}
            </p>
          </div>
        </div>
      </div>

      {(values.bill && values.people) ?  
      <button
        className="text-customCyan-500 bg-customCyan-600 rounded-md h-12 transition-colors duration-700 hover:bg-customCyan-200 "
        onClick={()=>{
            values.people =0;
            values.bill =0;
            values.tip = 0;
            values.total_tip_per_person =0;
            values.total_bill_per_person =0;
            dispatch({type: 'UPDATE_PEOPLE', payload: 0})
        }}
       
      >
        RESET
      </button>
      :
      <button
        className="text-customCyan-500  rounded-md h-12 transition-colors duration-700 bg-customCyan-400 cursor-not-allowed"
       
      >
        RESET
      </button>

      }

      
    </div>
  );
}

export default CalculateBill;
