import type { FC } from "react";

import { useCompanyById } from "../model/queries";

// import styles from "./CompanyDetails.module.scss";

interface ICompanyDetailsProps {
  companyId: string | number;
};

const CompanyDetails: FC<ICompanyDetailsProps> = ({ companyId }) => {
  const hasId = !!companyId;
  const { data } = useCompanyById(companyId, hasId);

  console.log(data)

  return (
    <div>
        
    </div>
  );
}

export default CompanyDetails;