import { QueryClientProvider } from "@tanstack/react-query";
import { MantineProvider } from "@mantine/core";
import { queryClient } from "./queryClient";
import { theme } from "./theme";
import { Contract } from "./components/Contract";
import { ModalsProvider } from "@mantine/modals";
import { modals } from "./components/modals/contextModals";

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <MantineProvider theme={theme}>
          <ModalsProvider modals={modals}>
            <div>
              <Contract />
            </div>
          </ModalsProvider>
        </MantineProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
