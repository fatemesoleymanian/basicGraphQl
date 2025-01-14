import _db from "./_db.js"

export const resolvers = {
    Query: {
        games() {
            return _db.games
        },
        reviews() {
            return _db.reviews
        },
        authors() {
            return _db.authors
        },
        review(_,args){
            return _db.reviews.find((review)=> review.id === args.id)
        },
        game(_,args){
            return _db.games.find((game)=> game.id === args.id)
        },
        author(_,args){
            return _db.authors.find((author)=> author.id === args.id)
        }
    },
    Game: {
        reviews(parent){
            return _db.reviews.filter((r)=> r.game_id === parent.id)
        }
    },
    Author: {
        reviews(parent){
            return _db.reviews.filter((r)=> r.author_id === parent.id)
        }
    },
    Review: {
        author(parent){
            return _db.authors.find((a)=> a.id === parent.author_id)
        },
        game(parent){
            return _db.games.find((g)=> g.id === parent.game_id)
        }
    },
    Mutation:{
        deleteGame(_,args){
            _db.games = _db.games.filter((g)=>g.id !== args.id)
            return _db.games
        },
        addGame(_,args){
            let game = {
                ...args.game,
                id:Math.floor(Math.random() * 100000).toString()
            }
            _db.games.push(game)
            return game
        },
        updateGame(_,args){
            _db.games = _db.games.map((g) => {
                if (g.id === args.id) {
                  return {...g, ...args.edits}
                }
        
                return g
              })
        
              return _db.games.find((g) => g.id === args.id)
        }
    }
}
