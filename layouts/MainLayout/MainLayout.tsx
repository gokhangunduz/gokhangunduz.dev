import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import { Fragment, ReactElement } from "react";
import ContainerLayout from "../ContainerLayout/ContainerLayout";
import Footer from "@/components/Footer/Footer";

interface IMainLayout {
  children: ReactElement | ReactElement[];
}

export default function MainLayout({ children }: IMainLayout): ReactElement {
  return (
    <Fragment>
      <Header />
      <Sidebar />
      <ContainerLayout>{children}</ContainerLayout>
      <Footer />
    </Fragment>
  );
}
