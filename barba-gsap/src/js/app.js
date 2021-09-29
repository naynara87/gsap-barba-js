import barba from '@barba/core';
// import barbaPrefetch from '@barba/prefetch';
import barbaRouter from '@barba/router';
import gsap from 'gsap';
import { revealProject, leaveToProject, leaveFromProject, animationEnter, animationLeave } from './animations';

const myRouters = [
  {name:'home',path:'/index.html'},
  {name:'archtecture',path:'/archtecture.html'},
  {name:'detail',path:'/detail-page.html'},
  {name:'detail-2',path:'/detail-page2.html'},
]

barba.use(barbaRouter,{
  routes: myRouters;
)}
// barba.use(barbaPrefetch)

const resetActiveLink = () => gsap.set('a.is-active span', {
    xPercent: -100,
    transformOrigin: 'left'
});

barba.hooks.enter((data) => {
  console.log(data);
  window.scrollTo(0,0);
})

barba.hooks.after(() => {
  // console.log('after');
  consolg.log({data});
})

barba.init({
  views:[
    {
      namespace:'architecture',
      beforeEnter(){
        console.log('beforeEnter architecture')
      }
    }
  ],
    transitions: [
        {
            name: 'detail',
            to: {
                namespace: ['detail']
            },
            once({next}){
                revealProject(next.container)
            },
            leave: ({current}) => leaveToProject(current.container),
            enter({next}){
                revealProject(next.container)
            }
        },
        {
            name: 'general-transition',
            once({next}){
                resetActiveLink();
                gsap.from('header a', {
                    duration: 0.6,
                    yPercent: 100,
                    stagger: 0.2,
                    ease: 'power1.out',
                    onComplete: () => animationEnter(next.container)
                });
            },
            leave: ({current}) => animationLeave(current.container),
            enter({next}){
                animationEnter(next.container);
            }
        },{
          name:'from-detail',
          from:{
            namespace:['detail']
          },
          leave:({current}) => leaveFromProject(current.container),
          enter({next}){
            gsap.from('header a',{
              duration:0.6,
              yPercent:100,
              stagger:0.2,
              ease:'power1.out',
              onComplete:()=> animationEnter(next.container)

            })
          }
        },{
          name:'from-detail',
          from:{
            namespace:['detail-2']
          },
          leave:({current}) => leaveFromProject(current.container),
          enter({next}){
            gsap.from('header a',{
              duration:0.6,
              yPercent:100,
              stagger:0.2,
              ease:'power1.out',
              onComplete:()=> animationEnter(next.container)

            })
          }
        }
    ]
    ]
})