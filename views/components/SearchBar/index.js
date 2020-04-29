// @flow

import React, { forwardRef, useCallback, useState } from 'react'
import Autosuggest from 'react-autosuggest'
import classNames from 'classnames'
import Link from 'next/link'
import { connect } from 'react-redux'
import { getMapCrypto } from 'ducks/mapCrypto/actions'
import { Search } from 'components/icons/Search'
import { Close } from 'components/icons/Close'
import type { Props } from './types'

const SearchBar = forwardRef<Props, HTMLInputElement>(
  (
    {
      data,
      progress,
      loaded,
      getMapCrypto,
      shape,
      selectable = false,
      onChange: handleChange,
    },
    ref
  ) => {
    const [value, setValue] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [logoId, setLogoId] = useState(null)

    const handleClearValue = useCallback(() => {
      setValue('')
      setLogoId(null)
      handleChange?.(null)
    }, [setValue, setLogoId, handleChange])

    const handleLogoIdChange = useCallback(
      (id) => () => {
        setLogoId(id)
        handleChange?.(id)
      },
      [handleChange]
    )

    const onChange = useCallback(
      (event, { newValue }) => {
        setValue(newValue)
        if (!newValue) {
          setLogoId(null)
          handleChange?.(null)
        }
      },
      [setValue, setLogoId, handleChange]
    )

    const onClick = useCallback(() => {
      if (!loaded) {
        getMapCrypto()
      }
    }, [loaded, getMapCrypto])

    const onSuggestionsFetchRequested = useCallback(
      ({ value }) => {
        if (progress) return

        const inputValue = value.trim().toLowerCase()
        const inputLength = inputValue.length
        const foundSuggestions =
          inputLength === 0
            ? []
            : data.filter(
                (lang) =>
                  lang.name.toLowerCase().slice(0, inputLength) ===
                    inputValue ||
                  lang.symbol.toLowerCase().slice(0, inputLength) === inputValue
              )

        setSuggestions(foundSuggestions)
      },
      [progress, data]
    )

    const onSuggestionsClearRequested = useCallback(
      () => setSuggestions([]),
      []
    )

    const getSuggestionValue = (suggestion) =>
      selectable ? `${suggestion.name} (${suggestion.symbol})` : ''

    const renderSuggestion = (suggestion) => {
      const renderedLogo = (
        <img
          src={`https://s2.coinmarketcap.com/static/img/coins/32x32/${suggestion.id}.png`}
          alt="logo"
          className="search__img"
        />
      )

      if (selectable) {
        return (
          <span
            className="aic p3 fw-medium search__link"
            onClick={handleLogoIdChange(suggestion.id)}
          >
            {renderedLogo}
            {`${suggestion.name} (${suggestion.symbol})`}
          </span>
        )
      }

      return (
        <Link href="/coin/[slug]" as={`/coin/${suggestion.slug}`}>
          <span className="aic p3 fw-medium search__link">
            {renderedLogo}
            {`${suggestion.name} (${suggestion.symbol})`}
          </span>
        </Link>
      )
    }

    const renderInputComponent = (inputProps) => {
      const renderedLogo = logoId && inputProps.value && (
        <img
          src={`https://s2.coinmarketcap.com/static/img/coins/32x32/${logoId}.png`}
          alt="logo"
          className="search__coin-logo"
        />
      )

      const renderedAddon = () => {
        if (inputProps.value.length > 0) {
          return (
            <button
              type="button"
              className="pure-btn search__btn"
              onClick={handleClearValue}
            >
              <Close />
            </button>
          )
        }

        return (
          <button type="button" className="pure-btn search__btn">
            <Search />
          </button>
        )
      }

      const searchBarClassName = classNames({
        search__input: true,
        search__input_bordered: shape === 'bordered',
        ' search__input_logo-search': logoId && inputProps.value,
      })

      return (
        <div className="search__inner">
          <input {...inputProps} className={searchBarClassName} />
          {renderedLogo}
          {renderedAddon()}
        </div>
      )
    }

    const inputProps = {
      ref,
      placeholder: 'Search...',
      value,
      onChange,
      onClick,
    }

    return (
      <Autosuggest
        suggestions={suggestions.slice(0, 6)}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        renderInputComponent={renderInputComponent}
        inputProps={inputProps}
      />
    )
  }
)

export default connect(
  ({ mapCrypto: { data, progress, loaded } }) => ({
    data,
    progress,
    loaded,
  }),
  (dispatch) => ({
    getMapCrypto: () => dispatch(getMapCrypto()),
  })
)(SearchBar)
