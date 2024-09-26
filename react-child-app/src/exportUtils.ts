import {createRoot as ReactDOMCreateRoot} from "react-dom/client";
import {createBrowserHistory, type History} from "history";


export default function getExportMountFunction(reactComponent: any) {
  return (el: HTMLElement, {onNavigate, defaultHistory, initialPath}: {
    onNavigate: ({pathname}: {pathname: string}) => void,
    defaultHistory?: History,
    initialPath: string
  }, props: object = {}) => {
    const history =
      defaultHistory ||
      createBrowserHistory({
        initialEntries: [initialPath],
        basename: initialPath
      });
    console.log("HISTORY:", history)

    if (onNavigate) {
      history.listen(onNavigate);
    }
    const rootReactElement = ReactDOMCreateRoot(el);
    const createdReactComponent = reactComponent(props);
    rootReactElement.render(createdReactComponent);
    // ReactDOM.render(<App onSignIn={onSignIn} history={history} />, el);

    return {
      onParentNavigate: (nextPathname: string) => {
        const {pathname} = history.location;
        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
      unmount: () => {
        rootReactElement.unmount();
      }
    }
  };
}
