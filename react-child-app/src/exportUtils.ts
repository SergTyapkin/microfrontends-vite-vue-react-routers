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
        // @ts-ignore
        initialEntries: [initialPath],
        basename: initialPath
      });

    if (onNavigate) {
      // @ts-ignore
      history.listen(onNavigate);
    }
    const rootReactElement = ReactDOMCreateRoot(el);
    const createdReactComponent = reactComponent(props);
    rootReactElement.render(createdReactComponent);
    // ReactDOM.render(<App onSignIn={onSignIn} history={history} />, el);

    return {
      onParentNavigate: (nextPath: string) => {
        const {pathname: path} = history.location;
        if (path !== nextPath) {
          history.push(nextPath);
        }
      },
      unmount: () => {
        rootReactElement.unmount();
      }
    }
  };
}
