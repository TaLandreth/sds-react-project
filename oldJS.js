
    //PAGING - FORWARD
    getNextPages() {

        let position = this.props.page.length       //the set that you're viewing (length of the page)
        let qty = this.state.numberOf               //set how many you're viewing

        let where = this.state.pg + position        //updating set + position to change to next set

        this.setState({
            pg: where
        })

        console.log("Which set; position: " + where)
        console.log("How many to view: " + qty)

        this.props.next(qty, where)
    }
    //PAGING - BACK
    getPrevPages() {

        let position = this.props.page.length       //the set that you're viewing (length of the page)
        let qty = this.state.numberOf               //set how many you're viewing

        if (this.state.pg <= 1) {
            this.props.next(qty, 0)
        }

        else {
            let where = this.state.pg - position        //updating set + position to change to next set

            this.setState({
                pg: where
            })

            this.props.next(qty, where)
        }

    }
