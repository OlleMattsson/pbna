import { IncomeStatementUI } from "../pbna-core/IncomeStatement";

export const IncomeStatement = ({ledger}) =>  {
    return (
        <div>
            <IncomeStatementUI ledger={ledger}/>
        </div>
    )
}