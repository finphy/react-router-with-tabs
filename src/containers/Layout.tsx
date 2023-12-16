import { ReactElement, useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

type Tab = {
  to: string;
  label: string;
};

type Menu = {
  to: string;
  tab: string;
  label: string;
};

const menus: Menu[] = [
  { to: "cat", tab: "Cat", label: "Cat" },
  { to: "blue", tab: "Blue", label: "Blue" },
  { to: "red", tab: "Red", label: "Red" },
  { to: "red/123", tab: "Get Red 123", label: "Red With Params" },
  { to: "red?id=123", tab: "Get Red 123", label: "Red With Query" },
];

export default function Layout() {
  const { pathname, search, state } = useLocation();
  const currentTo = `${pathname}${search}`;
  const isSelected = (to: string) => currentTo.endsWith(to);

  const [pageStates, setPageStates] = useState<{ state: any; to: string }[]>(
    []
  );

  const [tabs, setTabs] = useState<Tab[]>([]);

  const updateTabs = () => {
    if (!state) return;
    const { from, tab } = state;
    const index = tabs.findIndex((tab: Tab) => tab.to === from);
    if (index === -1) setTabs([...tabs, { to: from, label: tab }]);
  };

  const setPageState = (pageState: any) => {
    const index = pageStates.findIndex(({ to }: any) => to === currentTo);
    if (index === -1) {
      setPageStates([
        ...pageStates,
        {
          to: currentTo,
          state: pageState,
        },
      ]);
    } else {
      setPageStates([
        ...pageStates.slice(0, index),
        {
          to: currentTo,
          state: pageState,
        },
        ...pageStates.slice(index + 1),
      ]);
    }
  };

  useEffect(() => {
    updateTabs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <>
      <div
        className="grid gap-2 p-2"
        style={{ gridTemplateColumns: "200px auto" }}
      >
        <div className="border border-solid border-black rounded">
          <ul>
            {menus.map((menu: Menu, index: number) => {
              return (
                <li key={index} className="py-2">
                  <CustomLink to={menu.to} tab={menu.tab}>
                    {menu.label}
                  </CustomLink>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          {tabs.length > 0 && (
            <div className="mb-2 flex gap-4">
              {tabs.map((tab: Tab, index: number) => {
                return (
                  <div
                    key={index}
                    className={`border border-solid border-black rounded px-4 py-1 relative ${
                      isSelected(tab.to) ? "bg-zinc-400" : ""
                    }`}
                  >
                    <Link to={tab.to}>{tab.label}</Link>
                    <div
                      className="absolute top-[-9px] right-[-9px] cursor-pointer"
                      style={{ width: 18, height: 18 }}
                    >
                      <button
                        className="m-[-3px] rounded-full"
                        onClick={() => {
                          setTabs([
                            ...tabs.slice(0, index),
                            ...tabs.slice(index + 1),
                          ]);
                        }}
                      >
                        x
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <div className="border border-solid border-black rounded p-2">
            <Outlet
              context={{
                pageState: (
                  pageStates[
                    pageStates.findIndex(({ to }: any) => to === currentTo)
                  ] || { state: {} }
                ).state,
                setPageState,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

function CustomLink({
  to,
  tab,
  children,
}: {
  to: string;
  tab: string;
  children: string | ReactElement;
}) {
  return (
    <Link to={to} state={{ from: to, tab }}>
      {children}
    </Link>
  );
}
