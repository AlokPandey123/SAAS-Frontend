import { Link } from 'react-router-dom'

const Breadcrumbs = ({ items }) => {
  return (
    <nav className="flex items-center gap-2 text-sm text-zinc-500" aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1

        return (
          <div className="flex items-center gap-2" key={item.label}>
            {item.to && !isLast ? (
              <Link to={item.to} className="hover:text-zinc-800">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? 'text-zinc-800' : ''}>{item.label}</span>
            )}
            {!isLast ? <span>/</span> : null}
          </div>
        )
      })}
    </nav>
  )
}

export default Breadcrumbs
