import React, { Component } from 'react'
import alertify from 'alertifyjs'
import { connect } from "react-redux"
class Table extends Component {

    state = {
        libs: [],
    }

    updateLibClick (npmLibs, e) {
         // redux'a eriş. if kontrolü yaz eğer npmLibs o reduxun içinde varsa çıkarttırsın burda.
         // yoksa eklesin
        this.props.updateLibs(npmLibs)
        alertify.success('Başarıyla Eklendi');
       
    }

    render() {


        const { language, libs } = this.props;
        return (

            <div>

                <table className="table table-borderless">
                    <tbody>

                        {
                            language.map(i => {
                                return (
                                    <tr key={i.id}>
                                        <th scope="row" className="lib-name">
                                            <a href={i.url} target="_blank" rel="noopener noreferrer">{i.name}</a>
                                        </th>

                                        <td>{i.info}</td>
                                        <td>
                                            <button
                                                onClick={this.updateLibClick.bind(this, i)}
                                                type="button"
                                                className="btn btn-outline-success">
                                                Kaldır
                                            </button>
                                        </td>
                                    </tr>
                                )

                            })
                        }

                    </tbody>
                </table>
            </div>
        )
    }
}

function mapStateToLanguage(state) {
    return {
        language: state.languageReducers,
        libs: state.getLibsReducers
    }
}
const mapDispatchToProps = dispatch => ({
    updateLibs: (libs) => {
        dispatch({ type: "LIBS", payload: libs })
    },
    removeLIBS: (libs) => {
        dispatch({ type: "REMOVE_LIBS", payload: libs })
    }

})

export default connect(mapStateToLanguage, mapDispatchToProps)(Table)
