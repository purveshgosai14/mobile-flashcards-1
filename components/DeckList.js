import sortBy from 'sort-by';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import formStyles from '../styles/forms';
import React, { Component } from 'react';
import deckListStyles from '../styles/decklist';
import { FlatList, Text, TouchableHighlight, View } from 'react-native';

/**
 * @description Deck listing component
 */
class DeckList extends Component {
    /**
     * @description Proptypes
     */
    static propTypes = {
        decks: propTypes.object.isRequired,
        navigation: propTypes.object.isRequired,
    };

    /**
     * @description Navigation options
     * @param {object} navigation Navigation object
     */
    static navigationOptions = ({ navigation }) => ({
        title: 'Decks',
        headerLeft: null,
    });

    /**
     * @description Navigates to a given deck view
     * @param {string} title Deck title
     */
    navigateToDeck = title => {
        this.props.navigation.navigate(
            'Deck',
            {
                title,
            }
        );
    };

    /**
     * @description Navigates to the new deck form view
     */
    toDeckForm = () => {
        this.props.navigation.navigate('DeckForm');
    };

    /**
     * @description Sorts the decks alphabetically
     * @returns {array} Sorted decks
     */
    sortDecks = decks => {
        decks = this.props.decks || {};
        
        return Object.entries(decks)
            .sort(sortBy('1.title'))
            .map(deck => deck[1]);
    };
    
    /**
     * @description renders the component
     */
    render () {
        const sorted = this.sortDecks();

        return (
            <View style={{ flex: 1 }}>
                <TouchableHighlight 
                    onPress={this.toDeckForm} 
                    style={[formStyles.button, deckListStyles.button]}
                >
                    <Text style={formStyles.buttonText}>Add a new deck</Text>
                </TouchableHighlight>
                <FlatList
                    data={sorted}
                    keyExtractor={item => item.title}
                    renderItem={({ item }) => (
                        <TouchableHighlight onPress={() => this.navigateToDeck(item.title)}>
                            <View style={deckListStyles.card}>
                                <Text>
                                    {item.title}
                                </Text>
                                <Text>
                                    {item.questions.length} cards
                                </Text>
                            </View>
                        </TouchableHighlight>
                    )}
                />
            </View>
        );
    }
}

/**
 * @description Maps the store state to component properties
 * @param {object} decks Decks object
 * @returns {object} Props to map
 */
const mapStateToProps = decks => {
    return {
        decks,
    };
};

export default connect(mapStateToProps)(DeckList);
