import React from 'react';

import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/Commons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar(props) {
  return (
    <Box>
      <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: '61px' }}/>
      <hr/>

      <p>
        <a href={`https://github.com/${props.githubUser}`} className="boxLink">
          @{props.githubUser}
        </a>
      </p>
      <hr/>

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

export default function Home() {
  const githubUser = 'heytorvas';
  const [comunities, setComunities] = React.useState([{
          id: new Date().toISOString(),
          title: 'Eu odeio acordar cedo',
          image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
        }]);
  const favoritePeople = ['janiojunior', 'jhemysbarros', 'julianovieira7'];

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">Bem vindo (a)</h1>
            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>

            <form onSubmit={
              function handleCreateComunity(e) {
                e.preventDefault();
                const formData = new FormData(e.target);
                const comunity = {
                  id: new Date().toISOString(),
                  title: formData.get('title'),
                  image: formData.get('image'),
                }

                const comunitiesUpdated = [...comunities, comunity];
                setComunities(comunitiesUpdated);

            }}>
              <input placeholder="Qual vai ser o nome da sua comunidade?" type="text" name="title" aria-label="Qual vai ser o nome da sua comunidade?" />
              <input placeholder="Coloque uma URL para ser a capa da sua comunidade" type="text" name="image" aria-label="Coloque uma URL para ser a capa da sua comunidade" />
              <button>Criar Comunidade</button>
            </form>
          </Box>
        </div>
      
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle" >Comunidades ({comunities.length})</h2>
            <ul>
              {comunities.map((item) => {
                return (
                  <li key={item.id}>
                    <a href={`/users/${item.title}`}>
                      <img src={item.image} />
                      <span>{item.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle" >Pessoas da Comunidade ({favoritePeople.length})</h2>
            <ul>
              {favoritePeople.map((item) => {
                return (
                  <li key={item}>
                    <a href={`/users/${item}`}>
                      <img src={`https://github.com/${item}.png`} />
                      <span>{item}</span>
                    </a>
                  </li>
                  
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

        </div>
      </MainGrid>
    </>
  )
}
