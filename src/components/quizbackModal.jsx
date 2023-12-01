import { Modal, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import React from 'react'

const QuizbackModal = () => {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <div>
            <Modal opened={opened} onClose={close} title="Alert!">
                <Text>Are you sure, you want to exit the quiz?</Text>
            </Modal>
        </div>
    )
}

export default QuizbackModal
