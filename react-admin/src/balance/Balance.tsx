import { BalanceSheetUI } from "../pbna-core/BalanceSheet";

export const BalanceSheet = ({ledger}) =>  {
    return (
        <div>
            <BalanceSheetUI ledger={ledger}/>
        </div>
    )
}