import { useEffect, useState } from 'react'

// Exercício 5: porta e caminho da listagem da API Express
const URL_API = 'http://localhost:3000/api/v1/contatos'

// Exercício 6: fetch + carregando/erro/vazio + lista com key={item._id ?? item.id}
export default function ListaContatos() {
  const [itens, setItens] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    const controle = new AbortController()

    async function buscar() {
      try {
        setCarregando(true)
        setErro(null)
        const resp = await fetch(URL_API, { signal: controle.signal })
        if (!resp.ok) throw new Error(`HTTP ${resp.status} — ${resp.statusText}`)
        const json = await resp.json()
        // a API pode devolver um array direto ou { data: [...], meta }
        setItens(Array.isArray(json) ? json : json.data ?? [])
      } catch (e) {
        if (e.name !== 'AbortError') setErro(e.message)
      } finally {
        setCarregando(false)
      }
    }

    buscar()

    return () => controle.abort()
  }, [])

  if (carregando) return <p>Carregando...</p>
  if (erro) return <p>Erro: {erro}</p>
  if (itens.length === 0) return <p>Nenhum item encontrado.</p>

  return (
    <ul>
      {itens.map(item => (
        <li key={item._id ?? item.id}>{item.nome ?? item.name}</li>
      ))}
    </ul>
  )
}
