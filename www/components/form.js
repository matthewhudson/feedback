import React from 'react'
import {
  Pane,
  Heading,
  Text,
  Label,
  Button,
  TextInput,
  CheckCircleIcon,
  Select,
  Textarea
} from 'evergreen-ui'

const SmallText = props => (
  <Text lineHeight="16px" css={{ verticalAlign: 'top' }} {...props} />
)

export class AirtableForm extends React.Component {
  render() {
    const { state, onChange, onSubmit } = this
    const {
      children,
      form: propsForm,
      doneMessage,
      ctaMessage,
      ctaText,
      baseId,
      table
    } = this.props

    const form = propsForm || [
      {
        key: 'name',
        label: 'Name (optional)'
      },
      {
        key: 'workEmail',
        type: 'textarea',
        label: 'Feedback',
        required: true
      }
    ]

    return (
      <Pane
        is="form"
        onSubmit={e => {
          e.preventDefault()
          onChange('didSubmit')(true)
          onSubmit({
            baseId,
            table,
            state
          })
        }}
        elevation={1}
        borderRadius={3}
        overflow="hidden"
        background="white"
        width={400}
      >
        {children}
        <Pane paddingX={16}>
          {form.map(({ key, required, type, label, placeholder, options }) => (
            <Pane key={key} width="100%" marginTop={12}>
              <Label
                display="block"
                fontSize={12}
                fontWeight={600}
                marginBottom={8}
              >
                {label}
              </Label>
              {type === 'select' ? (
                <Select
                  disabled={state.didSubmit}
                  width="100%"
                  value={state[key]}
                  onChange={onChange(key)}
                >
                  {options.map(({ label, value }, index) => (
                    <option key={index} value={value || label}>
                      {label}
                    </option>
                  ))}
                </Select>
              ) : type === 'textarea' ? (
                <Textarea
                  required={required}
                  disabled={state.didSubmit}
                  type={type || 'text'}
                  width="100%"
                  minWidth="none"
                  value={state[key]}
                  placeholder={placeholder}
                  onChange={onChange(key)}
                />
              ) : (
                <TextInput
                  required={required}
                  disabled={state.didSubmit}
                  type={type || 'text'}
                  width="100%"
                  value={state[key]}
                  placeholder={placeholder}
                  onChange={onChange(key)}
                />
              )}
            </Pane>
          ))}
        </Pane>
        <Pane
          display="flex"
          padding={16}
          appearance="tint1"
          borderTop="extraMuted"
          justifyContent="space-between"
        >
          <Pane display="flex" alignItems="center" maxWidth="60%">
            {state.didSubmit
              ? doneMessage || (
                  <SmallText>
                    Refresh the page if you'd like to leave more feedback.
                  </SmallText>
                )
              : ctaMessage || (
                  <SmallText>All feedback is appreciated.</SmallText>
                )}
          </Pane>
          <Pane textAlign="right">
            {state.didSubmit ? (
              <Text color="muted">Feedback sent!</Text>
            ) : (
              <Button appearance="primary">{ctaText || 'Send Feedback'}</Button>
            )}
          </Pane>
        </Pane>
      </Pane>
    )
  }

  constructor(props) {
    super(props)

    this.state = {
      didSubmit: false,
      ...this.getFormState(props)
    }
  }

  onChange = key => e => {
    this.setState({
      [key]: e.target ? e.target.value : e
    })
  }

  getFormState = props => {
    if (!props.form) {
      return {
        name: '',
        workEmail: ''
      }
    }

    return props.form.reduce((acc, item) => {
      acc[item.key] = ''
      return acc
    }, {})
  }

  onSubmit = ({ baseId, table, state }) => {
    if (!baseId) {
      // throw new Error('Missing `baseId` prop for `AirtableForm`')
    }

    const body = { ...state }

    delete body.didSubmit

    // addToAirtable({ baseId, table, body })
  }
}

export default AirtableForm
